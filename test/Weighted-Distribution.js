const Contract = artifacts.require("./WeightedDistribution");

const { assertRevert } = require("./helpers/assertRevert");

contract("WeightedDistribution", function([_, ...accounts]) {
  beforeEach(async () => {
    this.deployer = accounts[0];

    this.contract = await Contract.new({
      from: deployer
    });
  });

  describe("payout", () => {
    it("fails above max total value", async () => {
      const personal = web3.utils.toWei("1000", "ether");
      const total = web3.utils.toWei("10000001", "ether");
      const winning = web3.utils.toWei("12000", "ether");

      await assertRevert(
        this.contract.calculatePayout.call(personal, total, winning)
      );
    });

    it("fails above max bet value", async () => {
      const personal = web3.utils.toWei("1001", "ether");
      const total = web3.utils.toWei("10000000", "ether");
      const winning = web3.utils.toWei("12000", "ether");

      await assertRevert(
        this.contract.calculatePayout.call(personal, total, winning)
      );
    });

    it("works at max bet value", async () => {
      const personal = web3.utils.toWei("1000", "ether");
      const total = web3.utils.toWei("1000000", "ether");
      const winning = web3.utils.toWei("12000", "ether");
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(
        output.toString(),
        web3.utils.toWei("83333.333333333333333333", "ether")
      );
    });

    it("works at max bet value 2", async () => {
      const personal = web3.utils.toWei("1000", "ether");
      const total = web3.utils.toWei("1000000", "ether");
      const winning = web3.utils.toWei("120000", "ether");
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(
        output.toString(),
        web3.utils.toWei("8333.333333333333333333", "ether")
      );
    });

    it("works at 1 eth bet value", async () => {
      const personal = web3.utils.toWei("1", "ether");
      const total = web3.utils.toWei("1000", "ether");
      const winning = web3.utils.toWei("12", "ether");
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(
        output.toString(),
        web3.utils.toWei("83.333333333333333333", "ether")
      );
    });

    it("works at small eth bet value", async () => {
      const personal = web3.utils.toWei(".0001", "ether");
      const total = web3.utils.toWei("1000", "ether");
      const winning = web3.utils.toWei("12", "ether");
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(output.toString(), "8333333333333333"); //.00083.... eth
    });

    it("works at wei bet value", async () => {
      const personal = "1";
      const total = web3.utils.toWei("1000", "ether");
      const winning = web3.utils.toWei("12", "ether");
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(output.toString(), "83");
    });

    it("works at wei bet value", async () => {
      const personal = "1";
      const total = "10";
      const winning = "3";
      const output = await this.contract.calculatePayout.call(
        personal,
        total,
        winning
      );

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(output.toString(), "3");
    });
  });

  describe("percentage test", () => {
    it("calculates percentage to insane precision", async () => {
      // const numerator = web3.utils.toWei("2", "ether");
      // const denominator = web3.utils.toWei("25", "ether");
      // const precision = web3.utils.toWei("12", "ether");
      const output = await this.contract.percent.call(2, 12, 75);

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(
        output.toString(),
        "166666666666666666666666666666666666666666666666666666666666666666666666666"
      );
    });

    it("calculates percentage to insane precision", async () => {
      // const numerator = web3.utils.toWei("2", "ether");
      // const denominator = web3.utils.toWei("25", "ether");
      // const precision = web3.utils.toWei("12", "ether");
      const output = await this.contract.percent.call(2, 1000, 75);

      // assert.equal(output.toString(), jsmath.toString());
      assert.equal(
        output.toString(),
        "2000000000000000000000000000000000000000000000000000000000000000000000000"
      );
    });
  });
});
