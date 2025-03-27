import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface NotFoundProps {
  content?: string;
}

const NotFoundPage = ({ content }: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Oops!</h1>
      <img src="/images/dog-404.png" alt="Error Dog" />
      <p>Something went wrong. We can't find this page.</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </section>
    //     {content ? content : "We can't find this page"}
  );
};

export default NotFoundPage;
