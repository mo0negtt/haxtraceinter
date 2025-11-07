import Footer from "../Footer";

export default function FooterExample() {
  return (
    <Footer
      onStatsClick={() => console.log("Stats clicked")}
      onFeedbackClick={() => console.log("Feedback clicked")}
    />
  );
}
