;; Reputation Contract

(define-map reputations
  { address: principal }
  {
    score: uint,
    total-claims: uint,
    approved-claims: uint
  }
)

(define-public (update-reputation (address principal) (claim-approved bool))
  (let
    (
      (current-rep (default-to { score: u500, total-claims: u0, approved-claims: u0 }
                               (map-get? reputations { address: address })))
      (new-score (if claim-approved
                     (+ (get score current-rep) u10)
                     (- (get score current-rep) u5)))
    )
    (ok (map-set reputations
      { address: address }
      {
        score: (if (> new-score u1000) u1000 (if (< new-score u0) u0 new-score)),
        total-claims: (+ (get total-claims current-rep) u1),
        approved-claims: (+ (get approved-claims current-rep) (if claim-approved u1 u0))
      }
    ))
  )
)

(define-read-only (get-reputation (address principal))
  (default-to { score: u500, total-claims: u0, approved-claims: u0 }
              (map-get? reputations { address: address }))
)

