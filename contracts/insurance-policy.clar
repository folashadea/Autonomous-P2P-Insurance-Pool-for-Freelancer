;; Insurance Policy Contract

(define-data-var policy-counter uint u0)

(define-map policies
  { policy-id: uint }
  {
    owner: principal,
    coverage-amount: uint,
    premium: uint,
    start-date: uint,
    end-date: uint,
    active: bool
  }
)

(define-public (create-policy (coverage-amount uint) (premium uint) (duration uint))
  (let
    (
      (policy-id (var-get policy-counter))
      (start-date block-height)
      (end-date (+ block-height duration))
    )
    (map-set policies
      { policy-id: policy-id }
      {
        owner: tx-sender,
        coverage-amount: coverage-amount,
        premium: premium,
        start-date: start-date,
        end-date: end-date,
        active: true
      }
    )
    (var-set policy-counter (+ policy-id u1))
    (ok policy-id)
  )
)

(define-read-only (get-policy (policy-id uint))
  (map-get? policies { policy-id: policy-id })
)

(define-public (cancel-policy (policy-id uint))
  (let
    (
      (policy (unwrap! (map-get? policies { policy-id: policy-id }) (err u404)))
    )
    (asserts! (is-eq (get owner policy) tx-sender) (err u403))
    (asserts! (get active policy) (err u400))
    (ok (map-set policies
      { policy-id: policy-id }
      (merge policy { active: false })
    ))
  )
)

