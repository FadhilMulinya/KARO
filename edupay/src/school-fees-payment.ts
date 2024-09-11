import {
  FeeStructureAdded as FeeStructureAddedEvent,
  InvoiceCreated as InvoiceCreatedEvent,
  PaymentProcessed as PaymentProcessedEvent,
  StudentRegistered as StudentRegisteredEvent
} from "../generated/SchoolFeesPayment/SchoolFeesPayment"
import {
  FeeStructureAdded,
  InvoiceCreated,
  PaymentProcessed,
  StudentRegistered
} from "../generated/schema"

export function handleFeeStructureAdded(event: FeeStructureAddedEvent): void {
  let entity = new FeeStructureAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeId = event.params.feeId
  entity.grade = event.params.grade
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInvoiceCreated(event: InvoiceCreatedEvent): void {
  let entity = new InvoiceCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.invoiceId = event.params.invoiceId
  entity.studentAddress = event.params.studentAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentProcessed(event: PaymentProcessedEvent): void {
  let entity = new PaymentProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.invoiceId = event.params.invoiceId
  entity.studentAddress = event.params.studentAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStudentRegistered(event: StudentRegisteredEvent): void {
  let entity = new StudentRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.studentAddress = event.params.studentAddress
  entity.name = event.params.name
  entity.studentId = event.params.studentId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
