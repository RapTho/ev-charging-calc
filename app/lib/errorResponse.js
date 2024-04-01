export const errorResponse = (status, msg) => {
  return Response.json(
    {
      Error: msg,
    },
    { status: status }
  );
};

export default errorResponse;
