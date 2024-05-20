import React from 'react';
import { Container, Title } from '@mantine/core';

function TechniquePage() {
  return (
    <Container
      size={1440}
      display="flex"
      style={{ flexDirection: 'column', gap: 40 }}
      pt={30}
    >
      <Title c="#FFF" fz={18}>Техника</Title>
    </Container>
  );
}

export default TechniquePage;
