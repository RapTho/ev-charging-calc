export const errorResponse = (status: number, msg: string) => {
  return Response.json(
    {
      Error: msg,
    },
    { status: status }
  );
};

export default errorResponse;
