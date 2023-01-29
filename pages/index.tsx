import { useUsers } from "@/api/userApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { Container, Table } from "react-bootstrap";

export default function Home() {
  const userResponse = useUsers();

  // Copilot suggestion to convert date to human readable format
  const convertToHumanBirthDate = (birthDate: string) => {
    const date = new Date(birthDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Head>
        <title>Github Copilot Sample</title>
        <meta name="description" content="Testing Github Copilot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Birth Date</th>
              </tr>
            </thead>
            <tbody>
              {userResponse.data?.map((user, index) => (
                <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{convertToHumanBirthDate(user.birthDate)}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </main>
    </>
  );
}
