import { createPublicClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  // transport: http(),
  transport: http("https://polygon-amoy.drpc.org"),
});
