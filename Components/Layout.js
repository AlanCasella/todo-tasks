import Nav from "./Nav";

function Layout({ children }) {
  return (
    <>
    <Nav></Nav>  
        {children}
    </>
  );
}

export default Layout;