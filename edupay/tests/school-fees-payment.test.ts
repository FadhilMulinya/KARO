import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { FeeStructureAdded } from "../generated/schema"
import { FeeStructureAdded as FeeStructureAddedEvent } from "../generated/SchoolFeesPayment/SchoolFeesPayment"
import { handleFeeStructureAdded } from "../src/school-fees-payment"
import { createFeeStructureAddedEvent } from "./school-fees-payment-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let feeId = BigInt.fromI32(234)
    let grade = "Example string value"
    let amount = BigInt.fromI32(234)
    let newFeeStructureAddedEvent = createFeeStructureAddedEvent(
      feeId,
      grade,
      amount
    )
    handleFeeStructureAdded(newFeeStructureAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FeeStructureAdded created and stored", () => {
    assert.entityCount("FeeStructureAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FeeStructureAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "feeId",
      "234"
    )
    assert.fieldEquals(
      "FeeStructureAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "grade",
      "Example string value"
    )
    assert.fieldEquals(
      "FeeStructureAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
