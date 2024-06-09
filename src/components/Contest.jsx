import { Link } from "react-router-dom";

const Contest = ({ contest }) => {
  return (
    <div>
      <div className="mx-auto card card-compact w-96 bg-base-100 shadow-xl my-8">
        <figure>
          <img
            src={contest.image}
            alt="contest image"
            className="w-full h-48"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{contest.contestName}</h2>
          <p>{contest.contestDescription}</p>
          <p>Category: {contest.contestType}</p>
          <Link to={`/contest/${contest._id}`} className="card-actions justify-end">
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contest;
