import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  FeeStructureAdded,
  InvoiceCreated,
  PaymentProcessed,
  StudentRegistered
} from "../generated/SchoolFeesPayment/SchoolFeesPayment"

export function createFeeStructureAddedEvent(
  feeId: BigInt,
  grade: string,
  amount: BigInt
): FeeStructureAdded {
  let feeStructureAddedEvent = changetype<FeeStructureAdded>(newMockEvent())

  feeStructureAddedEvent.parameters = new Array()

  feeStructureAddedEvent.parameters.push(
    new ethereum.EventParam("feeId", ethereum.Value.fromUnsignedBigInt(feeId))
  )
  feeStructureAddedEvent.parameters.push(
    new ethereum.EventParam("grade", ethereum.Value.fromString(grade))
  )
  feeStructureAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feeStructureAddedEvent
}

export function createInvoiceCreatedEvent(
  invoiceId: BigInt,
  studentAddress: Address,
  amount: BigInt
): InvoiceCreated {
  let invoiceCreatedEvent = changetype<InvoiceCreated>(newMockEvent())

  invoiceCreatedEvent.parameters = new Array()

  invoiceCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "invoiceId",
      ethereum.Value.fromUnsignedBigInt(invoiceId)
    )
  )
  invoiceCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "studentAddress",
      ethereum.Value.fromAddress(studentAddress)
    )
  )
  invoiceCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return invoiceCreatedEvent
}

export function createPaymentProcessedEvent(
  invoiceId: BigInt,
  studentAddress: Address,
  amount: BigInt
): PaymentProcessed {
  let paymentProcessedEvent = changetype<PaymentProcessed>(newMockEvent())

  paymentProcessedEvent.parameters = new Array()

  paymentProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "invoiceId",
      ethereum.Value.fromUnsignedBigInt(invoiceId)
    )
  )
  paymentProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "studentAddress",
      ethereum.Value.fromAddress(studentAddress)
    )
  )
  paymentProcessedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paymentProcessedEvent
}

export function createStudentRegisteredEvent(
  studentAddress: Address,
  name: string,
  studentId: BigInt
): StudentRegistered {
  let studentRegisteredEvent = changetype<StudentRegistered>(newMockEvent())

  studentRegisteredEvent.parameters = new Array()

  studentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "studentAddress",
      ethereum.Value.fromAddress(studentAddress)
    )
  )
  studentRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  studentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "studentId",
      ethereum.Value.fromUnsignedBigInt(studentId)
    )
  )

  return studentRegisteredEvent
}
