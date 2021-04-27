import { Typography, Container, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        container: {
            marginTop: `calc(${theme.mixins.toolbar.minHeight} * 2)`,
            textAlign: "center",
            backgroundColor: "#F5F5F5",
        },
        typo: {
          fontSize: "24px"
        },
        link: {
          fontSize: "18px"
        }
    }
  
  })

const about = () => {

    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant="h5">
                App made by Alan Casella
            </Typography>
            <Link href="https://www.linkedin.com/in/alan-casella-8909bb1b8/" className={classes.link} target="_blank">Linkedin</Link><br/>
            <Link href="https://github.com/AlanCasella" className={classes.link} target="_blank">Github</Link><br/>
            <Link href="https://portfolio-alancasella.vercel.app/" className={classes.link} target="_blank">Portfolio</Link>
        </Container>
    );
};

export default about;