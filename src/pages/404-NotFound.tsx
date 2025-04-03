import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface NotFoundProps {
  content?: string;
}

const NotFoundPage = ({ content }: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1>Oops!</h1>
      <img src="/images/dog-404.png" alt="Error Dog" />
      <p>We can't find this page.</p>
      <Button className="py-5 my-5" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </section>
  );
};

export default NotFoundPage;
