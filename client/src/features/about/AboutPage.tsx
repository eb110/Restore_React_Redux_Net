import { ButtonGroup, Container, Typography, Button } from "@mui/material";
import agent from "../../api/agent";
import { AxiosError } from "axios";

export const AboutPage = (): React.ReactNode => {
  return (
    <>
      <Container>
        <Typography gutterBottom variant="h4">
          Testing errors
        </Typography>
        <ButtonGroup fullWidth>
          <Button variant="contained"
            onClick={():any  =>
              agent.TestErrors.get400Error().catch((error: AxiosError) =>
                console.log(error)
              )
            }
          >
            Test400Error
          </Button>
          <Button
            variant="contained"
            onClick={(): any =>
              agent.TestErrors.get404Error().catch((error: AxiosError) =>
                console.log(error)
              )
            }
          >
            Test404Error
          </Button>
          <Button
            variant="contained"
            onClick={(): any =>
              agent.TestErrors.get401Error().catch((error: AxiosError) =>
                console.log(error)
              )
            }
          >
            Test401Error
          </Button>
          <Button
            variant="contained"
            onClick={(): any =>
              agent.TestErrors.get500Error().catch((error: AxiosError) =>
                console.log(error)
              )
            }
          >
            Test500Error
          </Button>
          <Button
            variant="contained"
            onClick={(): any =>
              agent.TestErrors.getValidationError().catch((error: AxiosError) =>
                console.log(error)
              )
            }
          >
            TestValaidationError
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};
