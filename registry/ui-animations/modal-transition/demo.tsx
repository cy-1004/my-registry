"use client"

import { ModalTransition } from "@/registry/ui-animations/modal-transition/modal-transition"

export default function ModalTransitionDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <ModalTransition
        triggerLabel="Open modal"
        title="Animated modal"
        description="This dialog fades and scales in using motion's AnimatePresence, and reuses the animated-button component for its trigger."
      />
    </div>
  )
}
