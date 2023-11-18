import Mux from "@mux/mux-node";

const { Video: MuxVideo } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export { MuxVideo };
