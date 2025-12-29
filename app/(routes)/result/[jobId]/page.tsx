export default function ResultPage({ params }: { params: { jobId: string } }) {
  return <div>Result page – Job ID: {params.jobId}</div>;
}
