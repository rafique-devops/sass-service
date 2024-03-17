interface GinesysCreationResponse {
  data: {
    checkerId: number;
  };
  message: {
    statusCode: number;
    messageText: string;
  };
}
