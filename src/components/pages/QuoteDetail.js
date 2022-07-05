import React, { Fragment } from "react";
import HighlightedQuote from "../quotes/HighlightedQuote";
import { Route, useParams, Routes as Switch } from "react-router-dom";
import Comments from "../comments/Comments";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Maximilian", text: "Learning React is great!" },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);
  if (!quote) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <div>
        <Route path={`/quotes/${params.quoteId}/comments`}>
          <Comments />
        </Route>
      </div>
    </Fragment>
  );
};

export default QuoteDetail;
