import PQueue from "p-queue";

export const fila = new PQueue({
  concurrency: 2
});