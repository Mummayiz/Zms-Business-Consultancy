import { domAnimation } from "motion/react";

/**
 * Loaded on demand by MotionProvider so Motion's feature code is a separate
 * chunk instead of part of the initial bundle. `domAnimation` covers the
 * animations, exit and in-view features this site uses.
 */
export default domAnimation;
