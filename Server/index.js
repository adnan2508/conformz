const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const SSLCommerzPayment = require('sslcommerz-lts')
const cors = require("cors");
require("dotenv").config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://conformz.web.app", "https://conformz-server.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'Unauthorized Access' });
  }
  const token = authorization.split(' ')[1];
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("in jwt verify.");
    if (err) {
      return res.status(401).send({ error: true, message: 'Unauthorized Access' })
    }
    req.decoded = decoded;

    next();
    console.log(req.decoded);
  })

};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.88u2plt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox


function generateTransactionId() {
  const extraLetter = "C";
  const currentDate = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // Format: YYMMDD
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }).replace(/:/g, ""); // Format: HHMM
  const randomDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");

  return `${extraLetter}${currentDate}-${currentTime}-${randomDigits}`;
}

// Date and time generation function
function generateDateTime() {
  const date = new Date();

  // Format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Format the time
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate}, ${formattedTime}`;
}

console.log(generateDateTime());


async function run() {
  try {
    const contestsCollection = client.db("conformz").collection("contests");
    const usersCollection = client.db("conformz").collection("users");
    const paymentsCollection = client.db('conformz').collection('payments');

    // Get all contests from db
    // app.get("/contests", async (req, res) => {
    //   const contestType = req.query.contestType;
    //   let query = {};
    //   if (contestType && contestType !== "null") query = { contestType };
    //   const result = await contestsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // stripe payment 
    app.post('/create-payment-intent', verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    })

    // get all contests for admin 
    app.get("/contests", async (req, res) => {
      console.log("contest api is called.");
      const result = await contestsCollection.find().toArray();
      res.send(result);
    });

    // ======================================================================Leader board api ==========================================================================
    // getting leader board data for all user 
    app.get('/leader-board/all-user', async (req, res) => {
      console.log("leader api is called.");
      const query = { role: 'user' };
      const result = await usersCollection.find(query).toArray();
      console.log('users:', result);
      res.send(result);
    });


    // get all contests for home page
    app.get("/contests/accepted", async (req, res) => {
      console.log("contest api is called.");
      const query = { status: "accepted" }
      const result = await contestsCollection.find(query).toArray();
      res.send(result);
    });

    // creating user 
    app.post('/new-user-registration', async (req, res) => {
      const user = req.body;
      console.log(user);
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      console.log(existingUser);
      if (existingUser) {
        console.log('user already exists');
        return res.send({ message: 'user already exists' })
      }

      const result = await usersCollection.insertOne(user);
      console.log("new user created : ", result);
      res.send(result);
    });


    // block status changing api
    app.patch('/admin/:email', async (req, res) => {
      const email = (req.params.email);
      const status = req.body.status;
      const filter = { email: email };
      let updateDoc = {
        $set: {
          blockStatus: status
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });


    // contest approving api
    app.patch('/admin/contest-approval/:id', async (req, res) => {
      const id = (req.params.id);
      const status = req.body.status;
      console.log("status: ", status);
      const filter = { _id: ObjectId.createFromHexString(id) };
      let updateDoc = {
        $set: {
          status: status
        },
      };
      const result = await contestsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });


    // Search api 
    app.get('/search', async (req, res) => {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }


      try {
        const results = await contestsCollection.find({ contestName: { $regex: query, $options: 'i' } }).toArray();

        res.json(results);
      } catch (error) {
        console.error('Error searching contests:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });

    // Popular contest filtering 
    app.get('/contests/popular', async (req, res) => {
      try {
        const popularContests = await contestsCollection
          .find()
          .sort({ totalParticipant: -1 })
          .limit(5)
          .toArray();
        res.json(popularContests);
      } catch (error) {
        console.error('Error fetching popular contests:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });


    // Best contest creator api 
    app.get('/creators/best', async (req, res) => {
      try {
        const creators = await contestsCollection.aggregate([
          {
            $group: {
              _id: '$creatorEmail',
              totalParticipants: { $sum: '$totalParticipant' },
              creatorName: { $first: '$creatorName' },
              creatorImage: { $first: '$creatorImage' },
              contests: {
                $push: {
                  contestName: '$contestName',
                  contestDescription: '$contestDescription',
                },
              },
            },
          },
          { $sort: { totalParticipants: -1 } },
          { $limit: 3 },
        ]).toArray();

        res.json(creators);
      } catch (error) {
        console.error('Error fetching best contest creators:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });


    // comment on pending contest 
    app.patch('/admin/contest-comment/:id', async (req, res) => {
      const id = req.params.id;
      const { comment } = req.body;
      console.log("comments: ", comment);
      const query = { _id: ObjectId.createFromHexString(id) };
      const updateDoc = {
        $set: {
          comments: comment, // Ensure your contest document has a 'comments' array field
        },
      };

      try {
        const result = await contestsCollection.updateOne(query, updateDoc);
        if (result.modifiedCount === 1) {
          res.status(200).send({ success: true, message: 'Comment added successfully', modifiedCount: result.modifiedCount });
        } else {
          res.status(404).send({ success: false, message: 'Contest not found' });
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
      }
    });


    // Deleting an user by email
    app.delete('/admin/user-delete/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };

      try {
        const result = await usersCollection.deleteOne(query);
        if (result.deletedCount === 1) {
          res.status(200).send({ success: true, message: 'User deleted successfully', deletedCount: result.deletedCount });
        } else {
          res.status(404).send({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
      }
    });

    // Deleting a contest data by id
    app.delete('/admin/contest-delete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId.createFromHexString(id) };

      try {
        const result = await contestsCollection.deleteOne(query);
        if (result.deletedCount === 1) {
          res.status(200).send({ success: true, message: 'User deleted successfully', deletedCount: result.deletedCount });
        } else {
          res.status(404).send({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
      }
    });


    // Save a contest data in db
    app.post("/contest", async (req, res) => {
      const contestData = req.body;
      const result = await contestsCollection.insertOne(contestData);
      res.send(result);
    });

    // Get all contests for creator by email
    app.get("/my-created-contest/:email", async (req, res) => {
      const email = req.params.email;
      let query = { creatorEmail: email };
      const result = await contestsCollection.find(query).toArray();
      res.send(result);
    });
    // Get all contests for creator by id for details of submissions
    app.get("/my-contest/accepted/:id", async (req, res) => {
      const id = req.params.id;
      let query = { _id: ObjectId.createFromHexString(id) };
      const result = await contestsCollection.findOne(query);
      res.send(result);
    });

    // Get all contests for creator by email which has been accepted
    app.get("/my-created-contest/accepted/:email", async (req, res) => {
      const email = req.params.email;
      let query = {
        creatorEmail: email,
        status: "accepted"
      };
      const result = await contestsCollection.find(query).toArray();
      res.send(result);
    });


    // get single contest data for creator
    app.get("/my-contest/update/:id", async (req, res) => {
      const id = req.params.id;
      let query = { _id: ObjectId.createFromHexString(id) };
      const result = await contestsCollection.findOne(query);
      res.send(result);
    });

    // Declare winner api 
    // app.patch('/creator/declare-winner/:id', async (req, res) => {
    //   const { id } = req.params;
    //   const { participantId } = req.body;

    //   try {
    //     const result = await contestsCollection.updateOne(
    //       { _id: ObjectId(id), "participants._id": ObjectId(participantId) },
    //       { $set: { winner: participantId } }
    //     );

    //     if (result.modifiedCount > 0) {
    //       res.json({ message: 'Winner declared successfully.' });
    //     } else {
    //       res.status(404).json({ error: 'Participant not found in contest.' });
    //     }
    //   } catch (error) {
    //     console.error('Error declaring winner:', error);
    //     res.status(500).json({ error: 'Server error' });
    //   }
    // });

    app.patch('/creator/contest/:contestId/declare-winner/:participantEmail', async (req, res) => {
      const { contestId, participantEmail } = req.params;
      console.log("contest id: ", contestId, "participantEmail: ", participantEmail);
      const participant = await usersCollection.findOne({ email: participantEmail });

      if (!participant) {
        return res.status(404).json({ error: 'Participant not found.' });
      }
      console.log("participant data: ", participant);

      // Step 2: Update contest document in contestsCollection
      const result = await contestsCollection.updateOne(
        { _id: ObjectId.createFromHexString(contestId) },
        {
          $set: {
            winnerId: participant._id,
            winnerName: participant.name,
            winnerEmail: participant.email,
            winnerImage: participant.photoURL,
            submissionStatus: "closed",
          }
        }
      );

      if (result.modifiedCount > 0) {
        await usersCollection.updateOne(
          { _id: participant._id },
          { $inc: { totalWinning: 1 } }
        );

        res.json({ message: 'Winner declared successfully.', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ error: 'Participant not found in contest or contest not found.' });
      }

    });


    // Delete a Contest
    app.delete("/contest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = contestsCollection.deleteOne(query);
      res.send(result);
    });

    // Get single contest from db
    app.get("/contest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contestsCollection.findOne(query);
      res.send(result);
    });
    // Get single contest from db
    app.get("/contest/registration/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId.createFromHexString(id) };
      const result = await contestsCollection.findOne(query);
      console.log("contest: ", result);
      res.send(result);
    });

    // update single contest by creator 
    // Update contest data
    app.put("/contest/:id", async (req, res) => {
      const id = req.params.id;
      const {
        contestName, contestType, taskSubmission, to, from, contestPrice, prize, contestDescription, image, creatorImage, creatorEmail, totalParticipant, status, comments, winnerId, winnerName, winnerImage,
      } = req.body;

      const filter = { _id: ObjectId.createFromHexString(id) };
      const updateDoc = {
        $set: {
          contestName, contestType, taskSubmission, to, from, contestPrice, prize, contestDescription, image, creatorImage, creatorEmail, totalParticipant, status, comments, winnerId, winnerName, winnerImage,
        },
      };

      try {
        const result = await contestsCollection.updateOne(filter, updateDoc);
        if (result.modifiedCount === 1) {
          res.status(200).send({ success: true, message: "Contest updated successfully" });
        } else {
          res.status(404).send({ success: false, message: "Contest not found" });
        }
      } catch (error) {
        console.error("Error updating contest:", error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
      }
    });



    // Auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '23h' });
      console.log(token);
      console.log({ token });
      res.send({ token })
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Save user data in db
    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      //Check if user is already in db
      const isExist = await usersCollection.findOne(query)
      if (isExist) {
        if (user.status === 'Requested') {
          //if existing user tries to change his roles
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.status },
          })
          return res.send(result)
        }
        else {
          return res.send(isExist)
        }
      }

      //save user for the first time
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
          timstamp: Date.now(),
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //Get a user info by email from db
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email })
      res.send(result);
    })

    //Get all users from db
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    // update a user role
    app.patch('/users/update/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body
      console.log("user data from status change : ", user);
      const query = { email }
      
      const result = await usersCollection.findOne( query);

      if(result && result.role==="user" && result.status ==="Requested"){
        // console.log("result2: ", result2);
        const requestUpdate = await usersCollection.updateOne(query, {
          $set: {
            status:'approved'
          },
        });

      }

      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now()
        },
      }
      const result2 = await usersCollection.updateOne(query, updateDoc);

      
      
      res.send(result2);
    })

    // getting my participated contest list 
    app.get('/user/:email/participated-contests', async (req, res) => {
      const userEmail = req.params.email;

      try {
        const participatedContests = await paymentsCollection.find({
          participantEmail: userEmail,
          paidStatus: true
        }).toArray();

        res.send(participatedContests);
      } catch (error) {
        console.error('Error fetching participated contests:', error);
        res.status(500).send('Server error');
      }
    });

    // update profile information api 
    app.put('/user/:userId', async (req, res) => {
      const userId = req.params.userId;
      const userData = req.body;

      console.log("data: ", userData);

      const filter = { _id: ObjectId.createFromHexString(userId) };
      const updateDoc = {
        $set: userData,
      };

      try {

        const result = await usersCollection.updateOne(filter, updateDoc);

        if (result.modifiedCount === 1) {
          res.status(200).send({ success: true, message: "User updated successfully" });
        } else {
          res.status(404).send({ success: false, message: "User not found" });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
      }
    });

    // getting winning contests 
    app.get('/user/:userEmail/winning-contests', async (req, res) => {
      const email = req.params.userEmail;
      const winningContests = await contestsCollection.find({ winnerEmail: email }).toArray();
      res.send(winningContests);
    })

    // Submission api for user contest 
    app.post('/contest/:contestId/submit', verifyToken, async (req, res) => {
      const contestId = req.params.contestId;
      const { participantEmail, submissionLink, participantName } = req.body;

      console.log("Submission data: Id:", contestId, "email:", participantEmail, "link:", submissionLink, "participantName: ", participantName);

      // if (!ObjectId.isValid(contestId)) {
      //   console.error("Invalid contest ID format:", contestId);
      //   return res.status(400).send({ success: false, message: 'Invalid contest ID format' });
      // }

      if (!participantEmail || !submissionLink) {
        console.error("Missing participant email or submission link");
        return res.status(400).send({ success: false, message: 'Missing participant email or submission link' });
      }

      try {
        const result = await contestsCollection.updateOne(
          { _id: ObjectId.createFromHexString(contestId) },
          {
            $push: {
              participants: {
                participantId: new ObjectId(),
                participantName,
                participantEmail,
                submissionLink
              }
            }
          },
          { upsert: true }
        );
        console.log("submission result: ", result);

        if (result.modifiedCount > 0 || result.upsertedCount > 0) {
          res.send({ success: true });
        } else {
          console.error("Submission failed: No documents modified");
          res.status(400).send({ success: false, message: 'Submission failed' });
        }
      } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).send('Server error');
      }
    });



    // Checking for existing contest registration 
    app.get('/contest/:id/isRegistered', async (req, res) => {
      const contestId = req.params.id;
      const participantEmail = req.query.email;

      try {
        const existingRegistration = await paymentsCollection.findOne({
          contestId: contestId,
          participantEmail: participantEmail,
          paidStatus: true
        });

        if (existingRegistration) {
          res.send({ isRegistered: true });
        } else {
          res.send({ isRegistered: false });
        }
      } catch (error) {
        console.error('Error checking registration:', error);
        res.status(500).send('Server error');
      }
    });


    // Payment related API 
    app.post('/contest-registration/payment', verifyToken, async (req, res) => {
      const paymentData = req.body;
      console.log("paymentData: ", paymentData);
      const paymentTime = generateDateTime();
      console.log('Payment data received:', paymentData);

      // Check if the user is already registered for the contest
      const existingRegistration = await paymentsCollection.findOne({
        contestId: paymentData.contestId,
        participantEmail: paymentData.participantEmail,
        paidStatus: true
      });

      if (existingRegistration) {
        console.log("User already registered for this contest.");
        return res.status(400).send({ message: 'User already registered for this contest.' });
      }

      const finalOrder = {
        contestId: paymentData.contestId,
        participantName: paymentData.participantName,
        participantEmail: paymentData.participantEmail,
        participantPhotoURL: paymentData.participantPhotoURL,
        contestName: paymentData.contestName,
        contestType: paymentData.contestType,
        contestImage: paymentData.contestImage,
        creatorEmail: paymentData.creatorEmail,
        contestPrice: paymentData.contestPrice,
        deadline: paymentData.deadline,
        transactionId: paymentData.transactionId,
        paidAmount: paymentData.paidAmount,
        paidStatus: true,
        paymentDate: paymentTime,
      };
      console.log("final order: ", finalOrder);
      const result = await paymentsCollection.insertOne(finalOrder);
      console.log("result: ", result);
      res.send(result);
    });


    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Conformz is running");
});

app.listen(port, () => {
  console.log(`Conformz is running on ${port}`);
});
