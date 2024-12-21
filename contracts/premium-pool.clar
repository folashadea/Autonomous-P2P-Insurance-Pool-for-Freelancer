;; Premium Pool Contract

(define-data-var pool-balance uint u0)

(define-public (pay-premium (amount uint))
  (let
    (
      (caller tx-sender)
    )
    (try! (stx-transfer? amount caller (as-contract tx-sender)))
    (var-set pool-balance (+ (var-get pool-balance) amount))
    (ok true)
  )
)

(define-public (pay-claim (amount uint) (recipient principal))
  (let
    (
      (caller tx-sender)
      (contract-address (as-contract tx-sender))
    )
    (asserts! (<= amount (var-get pool-balance)) (err u401))
    (try! (as-contract (stx-transfer? amount contract-address recipient)))
    (var-set pool-balance (- (var-get pool-balance) amount))
    (ok true)
  )
)

(define-read-only (get-pool-balance)
  (ok (var-get pool-balance))
)

