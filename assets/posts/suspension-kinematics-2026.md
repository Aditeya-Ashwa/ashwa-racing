# Suspension & Admin — How We Kept the Tyres Planted on the 2026 prototypes

**Author:** Ashwa Racing, Suspension & Admin  
**Date:** March 5, 2026  
**Tags:** Engineering, Suspension, Technical Insight, 2026 prototypes

---

*We ensure the tyres stay planted to the ground, delivering the grip the car demands — when it needs it.*

That's the one-sentence version. The longer version is what follows.

Suspension is a subsystem that rarely gets described accurately from the outside. People assume it's about springs and dampers. It isn't — or at least, that's not where the interesting decisions live. The interesting decisions are in the geometry: where the pivot points sit, how the wheel moves relative to the body as the car rolls and pitches, and what forces those movements create at the contact patch. Get the geometry wrong and no spring rate or damper setting will save you.

This post documents the key engineering decisions on the 2026 prototypes suspension, what we were trying to fix from the previous car, and the numbers behind the changes.

![2026 prototypes suspension assembly — front view](/assets/images/blog/sus-flat.webp)

## The Objective

The primary goal this season was to implement measurable kinematic improvements while holding firm on mass targets. Two things specifically were in scope:

1. **Dynamic camber behaviour** — how much the tyre tilts as the suspension compresses, and whether that tilt is working for us or against us
2. **Bump steer minimisation** — whether the toe angle changes as the wheel travels, which introduces steering inputs the driver hasn't asked for

Alongside the kinematic work, we were targeting an unsprung mass of 65 kg to align with the car's overall weight budget. Every gram below the hub contributes to ride quality and response in a way that equivalent sprung mass reduction doesn't — Newton's second law doesn't care about your chassis weight when it's calculating how quickly an unsprung corner can follow a bump.

## The Biggest Structural Decision: Removing the ARBs

The most significant change from the previous car is the elimination of both front and rear Anti-Roll Bars.

Anti-roll bars are a tuning tool — they allow you to adjust the front/rear roll stiffness balance without changing spring rates. Teams use them because they're convenient, not because they're free. They add mass, they add packaging complexity, and they introduce another potential compliance source in the suspension system.

Our assessment was that the stiffness balance we needed could be achieved through spring rate selection alone this season, and that the mass and packaging penalty of carrying ARBs wasn't justified by the tuning flexibility they offered. Eliminating them simplified the design, reduced component count, and freed up packaging space that matters in a tightly-integrated car.

Combined with a move to lighter tyres, this was the primary driver of unsprung mass reduction from the previous prototype.

## The Camber Story: 99° to 105°

The most quantifiable kinematic improvement on the 2026 prototypes is in dynamic camber generation.

On the previous prototype, the upper A-arm was inclined at 99° relative to the lower A-arm in the front view. On the 2026 prototypes, that angle is 105°. At the rear, the equivalent value moved from 100.34° to a revised figure in the same direction.

What this change does geometrically: increasing the upper A-arm inclination relative to the lower moves the Front View Instant Centre (IC) closer to the contact patch. The IC is the point about which the wheel appears to rotate in front view — it's defined by the intersection of lines extended through the upper and lower wishbones. When the IC is further from the wheel (long Front View Swing Arm, or FVSA), camber gain with bump is shallow. When the IC is closer (short FVSA), camber gain is steeper.

We wanted steeper camber gain. As the car rolls in a corner, the outer suspension compresses and we want the outer tyre to gain negative camber — tilting into the corner — to maintain a larger, more uniformly loaded contact patch under lateral force.

The result of this geometry change is a **45% increase in dynamic camber gain with bump** relative to the previous prototype. That's a substantial improvement in how effectively the tyre is loaded through a corner.

## Tools and Analysis

The kinematic work was done in **Lotus Shark**, which we've now standardised as the primary tool for suspension geometry analysis and optimisation. Lotus Shark lets us model the full hardpoint set, visualise camber, caster, toe, and instant centre behaviour across the full suspension travel range, and run comparative analysis between design iterations quickly.

Structural analysis was done in **ANSYS** — every component was validated for the required Factor of Safety under maximum loading conditions. For components under cyclic loading (uprights, A-arm nodes), fatigue life was specifically checked rather than just static strength.

**SolidWorks** handled part modelling and assembly, and **MS Excel** calculators were used for OEM-style hand calculations — ride frequency, spring rate targets, motion ratio verification, and bump steer checks.

![Solidworks uprights — Ayo look at this struc anys!](/assets/images/blog/uprights-2026.webp)

## Design Targets

The structural design process followed five firm targets:

**1. Factor of Safety compliance under maximum loading.**  
Every component needed to meet its FOS target under the worst-case load conditions identified in our analysis. No exceptions for mass savings.

**2. Topology optimisation for weight reduction.**  
Topology optimisation was applied to components where material could be removed without affecting stress distribution or performance. This is a formal process, not intuitive lightening — we let the solver identify where material isn't carrying load, then redesign accordingly.

**3. Minimise deflection.**  
Components that deflect under load alter the geometric setup the kinematics are built around. Upright deflection, in particular, can introduce effective compliance that changes toe and camber under load. Stiffness targets were set to keep deflection within bounds that don't meaningfully affect the kinematic behaviour.

**4. Packaging and clearance.**  
Adequate clearance between components for assembly and maintenance. This sounds basic but it's a source of real-world problems — suspension designs that look clean in CAD and create access issues in the workshop.

**5. Minimise compliance.**  
Compliance — elasticity in joints, mounts, and connections — is the enemy of predictable kinematics. A system that's geometrically correct in CAD but compliant in the actual hardware doesn't perform as designed. We treated compliance elimination as a first-order design constraint, not an afterthought.

## Materials

**A-Arms: AISI 1018 Carbon Steel Tubes**  
Selected for high strength under tensile and compressive loading, weldability, machinability, and local availability. For a tubular wishbone carrying primarily axial loads, 1018 hits the right balance of structural performance and fabrication simplicity.

**Uprights and Hubs: Al 7075-T6**  
The highest-strength aluminium alloy in common use, and the appropriate choice for a component that needs to be as light as possible while carrying combined bending, torsion, and braking loads. The high fatigue life of 7075-T6 is particularly relevant for uprights, which see cyclic loading throughout every event.

**Other components: Al 6061-T6 / AISI 1018 Carbon Steel**  
Used where the loading environment is less severe and fabrication simplicity or material availability is a priority.

![Exploded rear subassembly view](/assets/images/blog/sus-exploded.webp)

## Validation

Beyond simulation, validation on the 2026 prototypes was carried out through driver feedback and video analysis during testing sessions. Specific things we were looking for: visual tyre behaviour through corners, driver comments on front-end feel during turn-in and mid-corner, and any indication of handling balance issues that might point to geometry or compliance problems.

This is a limitation worth being honest about. Video and driver feedback are valuable but imprecise. The next development cycle will prioritise instrumented data — lateral and longitudinal G, wheel travel sensors, and ideally steering angle — to give us quantitative validation of kinematic behaviour under load rather than qualitative impressions.

## What the Suspension Is Actually Doing for Lap Time

The connection between suspension geometry and lap time runs through tyre loading. The forces a tyre can generate — lateral for cornering, longitudinal for braking and acceleration — are fundamentally constrained by how the tyre is loaded at the contact patch. A poorly oriented tyre under load generates less grip for the same vertical load. A well-oriented tyre extracts more from the available rubber.

The kinematic improvements on the 2026 prototypes — better camber gain, reduced bump steer, eliminated ARB compliance — are all working towards the same outcome: keeping the tyres in a more favourable orientation, more consistently, throughout each dynamic event. Whether that translates to lap time depends on what the driver does with the improved platform, but the geometry is now working harder in the right direction.

## The Trade-Off Framing

Suspension design is a constant trade-off. You cannot optimise every parameter at once. Some gains demand compromises.

Removing the ARBs simplified the system and saved mass, but removed a tuning lever. Increasing camber gain improves tyre loading in corners but increases tyre wear and changes the feel on turn-in. Stiffer components reduce compliance but add weight. Every decision in this document involved accepting some cost to gain something more important.

The goal is not a perfect suspension. The goal is a suspension where the trade-offs are deliberate, understood, and calibrated for the specific performance envelope of Formula Student competition. That's a harder target to hit than it sounds, and it's one we'll be working towards again next season.

---

*Detailed hardpoint coordinates, spring rate calculations, motion ratio data, and ANSYS simulation reports are documented in the internal engineering drive. Questions to the suspension team through the standard team channels.*

**Live it. Love it. Race it.**

— *Ashwa Racing, Suspension & Admin Division*