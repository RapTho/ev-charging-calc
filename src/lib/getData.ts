import type { StationData } from "@/types";

export const getData = async (
  start: number,
  end: number,
  authString: string
) => {
  const endpoint =
    `${process.env.DATA_URL}/api/Chargings/History?` +
    new URLSearchParams({
      from: `${Math.floor(start / 1000)}`,
      to: `${Math.floor(end / 1000)}`,
      type: "driver",
    });

  if (!endpoint) {
    console.error("DATA_URL is not defined.");
    return; // Return early if DATA_URL is not set
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: authString,
    },
  };

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: StationData[] = await response.json();

    return data.sort(
      (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
    );
  } catch (error) {
    console.error("Error fetching station data:", error);
  }
};

export default getData;
