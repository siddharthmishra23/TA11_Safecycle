import Nav from "../components/Nav";

function PageNotFound() {
  return (
    <div>
      <Nav />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Page not found
      </h1>
    </div>
  );
}

export default PageNotFound;
