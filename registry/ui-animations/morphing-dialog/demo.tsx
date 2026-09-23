"use client"

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/registry/ui-animations/morphing-dialog/morphing-dialog"

export default function MorphingDialogDemo() {
  return (
    <div className="flex items-center justify-center p-10">
      <MorphingDialog
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <MorphingDialogTrigger
          style={{ borderRadius: "4px" }}
          className="border bg-card"
        >
          <div className="flex items-center space-x-3 p-3">
            <MorphingDialogImage
              src="/images/placeholder-a.svg"
              alt="Book cover"
              className="h-8 w-8 object-cover object-top"
              style={{ borderRadius: "4px" }}
            />
            <div className="flex flex-col items-start justify-center">
              <MorphingDialogTitle className="text-xs font-medium">
                What I Talk About When I Talk About Running
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className="text-xs text-muted-foreground">
                Haruki Murakami
              </MorphingDialogSubtitle>
            </div>
          </div>
        </MorphingDialogTrigger>

        <MorphingDialogContainer>
          <MorphingDialogContent
            style={{ borderRadius: "12px" }}
            className="relative h-auto w-[500px] max-w-[90vw] border bg-card"
          >
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="relative p-6">
                <div className="flex justify-center py-10">
                  <MorphingDialogImage
                    src="/images/placeholder-a.svg"
                    alt="Book cover"
                    className="h-auto w-[200px] rounded-md"
                  />
                </div>
                <MorphingDialogTitle className="text-lg font-medium">
                  What I Talk About When I Talk About Running
                </MorphingDialogTitle>
                <MorphingDialogSubtitle className="font-light text-muted-foreground">
                  Haruki Murakami
                </MorphingDialogSubtitle>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>
                    In 1982, having sold his jazz bar to devote himself to
                    writing, Murakami began running to keep fit. A year later,
                    he had completed a solo course from Athens to Marathon.
                  </p>
                  <p>
                    Equal parts training log, travelogue, and reminiscence, this
                    memoir covers his four-month preparation for the 2005 New
                    York City Marathon.
                  </p>
                </div>
              </div>
            </div>
            <MorphingDialogClose className="text-muted-foreground" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </div>
  )
}
