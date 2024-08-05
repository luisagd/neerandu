import * as React from "react";
import { Link } from "gatsby";

const NotFoundPage = () => {
  return (
    <main className="px-24 text-cyan-950">
      <p className="mb-12">
        Esta página no se encuentra disponible.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in{" "}
            <code className="p-1 text-amber-700 text-xl rounded bg-orange-200">
              src/pages/
            </code>
            .
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Volver a inicio</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head = () => <title>No encontrado</title>;
