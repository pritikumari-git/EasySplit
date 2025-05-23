import {
  Container,
  Paper,
  Input,
  Button,
  Box,
  Title,
  Text,
} from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import api from "../../api";
import { AuthContext } from "../contexts/AuthContext";

function Register() {
  const { isLoggedIn, setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  if (isLoggedIn) return <Navigate to="../app/Groups" replace />;

  const handleChange = (value, field) => {
    setErrorMsg("");
    setDetails({ ...details, [field]: value });
  };

  const submit = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/register", details, { withCredentials: true });
      console.log(response);
      setIsLoggedIn(true);
      setUsername(response.data.username);
      setUserId(response.data.id);  // Use `.id` not `._id` (keep same as login response)
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="h-full flex justify-center items-center">
      <Paper withBorder radius="md" shadow="md" className="w-96 p-8">
        <Box className="mb-8">
          <Title order={2} className="mb-6">Create Your Account</Title>
          <Text size="lg">
            Join <span className="font-bold">EasySplit</span> and take charge of
            your shared expenses effortlessly.💸
          </Text>
        </Box>
        <form>
          <Input.Wrapper size="lg" label="Full Name" className="my-3" withAsterisk>
            <Input
              size="md"
              value={details.fullName}
              onChange={(e) => handleChange(e.target.value, "fullName")}
              required
            />
          </Input.Wrapper>

          <Input.Wrapper size="lg" label="Email" className="my-3" withAsterisk>
            <Input
              size="md"
              value={details.email}
              onChange={(e) => handleChange(e.target.value, "email")}
              type="email"
              required
            />
          </Input.Wrapper>

          <Input.Wrapper size="lg" label="Username" className="my-3" withAsterisk>
            <Input
              size="md"
              value={details.username}
              onChange={(e) => handleChange(e.target.value, "username")}
              required
            />
          </Input.Wrapper>

          <Input.Wrapper size="lg" label="Password" className="my-3" withAsterisk>
            <Input
              size="md"
              value={details.password}
              onChange={(e) => handleChange(e.target.value, "password")}
              type="password"
              required
            />
          </Input.Wrapper>

          <Text c="red">{errorMsg}</Text>

          <Button
            size="md"
            onClick={submit}
            color="myColor"
            className="mt-6"
            loading={loading}
            fullWidth
          >
            Register
          </Button>

          <Box mt="xs" ta="center">
            <Link to="../login" className="text-blue-600 hover:underline">
              Already have an account?
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
