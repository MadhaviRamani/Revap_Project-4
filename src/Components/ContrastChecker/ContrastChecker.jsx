import useSWR from "swr";
import "./ContrastChecker.css"
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch contrast data");
    }
    return res.json();
  });

export default function ContrastChecker({ hex, contrastText }) {
  const { data, isLoading, error } = useSWR(
    hex && contrastText
      ? `https://webaim.org/resources/contrastchecker/?fcolor=${contrastText.replace("#", "")}&bcolor=${hex.replace("#", "")}&api`
      : null,
    fetcher,
  );

  if (error) {
    return (
      <p>
        Error: {error.message} (Status: {error.status})
      </p>
    );
  }

  if (isLoading || !data) {
    return <p>Loading character...</p>;
  }

  return (
    <div>
      <p>
        Overall Contrast Score:{" "}
        {data.AAA === "pass" ? "Yup" : data.AA === "pass" ? "Kind" : "Nope"}
      </p>
    </div>
  );
}
