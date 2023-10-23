import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { format } from "date-fns";

export type FarmLoggingRecord = {
  id: string;
  harvestTimestamp: string;
  islandOwner: string;
  seedType: string;
  seedReturnCount: string;
  seedProduceCount: string;
  wormsGathered: string;
};

export const farmLoggingApi = createApi({
  reducerPath: "farmLogging",
  baseQuery: axiosBaseQuery<FarmLoggingRecord[]>({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getFarmLoggingData: builder.query<FarmLoggingRecord[], void>({
      query: () => ({
        method: "GET",
        url: "/farm-data",
      }),
      transformResponse: (eachElement) =>
        eachElement.map((element) => ({
          ...element,
          harvestTimestamp: format(new Date(element.harvestTimestamp), "P"),
          seedType: resolveSeedType(element.seedType),
          seedReturnCount:
            element.seedReturnCount == "0" ? "-" : element.seedReturnCount,
        })),
    }),
  }),
});

export const { useGetFarmLoggingDataQuery } = farmLoggingApi;

function resolveSeedType(seed: string): string {
  switch (seed) {
    case "@ITEMS_T5_FARM_CABBAGE_SEED":
      return "Cabbage";
    case "@ITEMS_T7_FARM_MULLEIN_SEED":
      return "Mullen";
    case "@ITEMS_T1_WORM":
      return "Worm";
    default:
      return "UNKNOWN";
  }
}
