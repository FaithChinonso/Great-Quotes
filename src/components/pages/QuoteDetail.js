import React, { Fragment, useEffect } from "react";
import HighlightedQuote from "../quotes/HighlightedQuote";
import {
  Route,
  useParams,
  Routes as Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Comments from "../comments/Comments";
import useHttp from "../hooks/use-https";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const match = useRouteMatch();

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <div>
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </div>
    </Fragment>
  );
};

export default QuoteDetail;
