import Container from "../container/Container";

const Ads = () => {
  return (
    <div className="p-8">
      <Container>
        <div className="bg-muted rounded-lg p-8 text-center border border-border">
          <p>Adds</p>
          <div className="bg-background/50 w-full  md:w-[970px] h-[90px] flex items-center justify-center rounded ">
            <p> w-970px h-90px </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Ads;
