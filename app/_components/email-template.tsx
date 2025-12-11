import * as React from "react";
import { Html, Body, Container, Text } from "@react-email/components";

interface EmailProps {
  emailId: string;
  message: string;
}

export function EmailTemplate({ emailId, message }: EmailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f6f6f6", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
            New Contact Message
          </Text>

          <Text>
            <strong>Email:</strong> {emailId}
          </Text>

          <Text style={{ marginTop: "10px" }}>
            <strong>Message:</strong> <br />
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
