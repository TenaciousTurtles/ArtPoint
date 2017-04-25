import React from 'react';
import { Container, Image, Grid, Button, Form } from 'semantic-ui-react';
import Moment from 'moment';
import BiddingRange from './BiddingRange.jsx';

const AuctionDetail = ({auction, setBid, handleClick, user, handleSave, handleUnsave, flag}) => {

  let endTime = new Moment(auction.end_date).format('MMMM Do, YYYY, h:mm:ss a');
  let current = +auction.current_bid;
  let start = +auction.start_price;
  let buyout = +auction.buyout_price;

  let interval = 0;
  if (buyout < 100) {
    interval = 10;
  } else if (buyout < 500) {
    interval = 50;
  } else if (buyout < 1000) {
    interval = 100;
  } else if (buyout < 5000) {
    interval = 500;
  } else {
    interval = 1000;
  }

  let avail = current ? Math.min(current + interval, buyout) : start;

  return (
    <Grid>
      <Grid.Column width={11}>
        <Image fluid src={auction.artwork.image_url} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Container>
          <h2>{auction.artwork.art_name}</h2>
          {user.username && !flag ? <Button circular icon="heart" content="save" color="green" onClick={() =>{
            handleSave(auction.id)
          }} /> : null}
          {user.username && flag ? <Button circular icon="empty heart" content="unsave" onClick={() => {
            handleUnsave(auction.id)
          }} /> : null}
          <h3>{auction.first_name} {auction.last_name} ({auction.artwork.age})</h3>
          <p><strong>Auction Ends:</strong> {endTime}</p>
          <p><strong>Description:</strong> {auction.artwork.description}</p>
          <p><strong>Current Price (USD):</strong> ${(auction.current_bid || auction.start_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p><strong>Buyout Price (USD):</strong> ${(auction.buyout_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <Form.Group widths='equal'>
            <span>
              <p>
                <strong className="blue-text">
                  Next available bidding amount: {avail.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </strong>
              </p>
              <strong>
                Bid for: 
              </strong>
              <input onChange={e => {
                if(isNaN(e.target.value)) {
                  e.target.value = '';
                } else {
                  setBid(e.target.value);
                }
              }} />
            </span>
            <Button className="ui right floated" color="green" onClick={handleClick}>Submit</Button>
          </Form.Group>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default AuctionDetail;
