pragma solidity ^0.4.18;

import "./math/SafeMath.sol";

contract WeightedDistribution {
  using SafeMath for uint;

  // constructor() public {
    
  // }

  function calculatePayout(uint personalBet, uint totalBet, uint winningSideBet) public pure returns (uint) {
    uint precision = 54;
    uint payout = totalBet.mul(percent(personalBet, winningSideBet, precision)).div((10 ** precision));
    return payout;
  }

  function percent(uint numerator, uint denominator, uint precision) public pure returns(uint quotient) {



    uint _numerator = numerator.mul(10 ** (precision));
    uint _quotient = ((_numerator.div(denominator)));
    return ( _quotient);

    //40
    // return 666666666666666666666666666666666666666666666666666666666666666666666666666;
  }
}
