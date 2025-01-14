import type { ComponentPropsWithout, RemovedProps } from '@radix-ui/themes/helpers'
import type { DialogContentOwnProps } from '@radix-ui/themes/props'
import type { ComponentRef, FC } from 'react'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { Dialog, Theme } from '@radix-ui/themes'
import { extractProps } from '@radix-ui/themes/helpers'
import { dialogContentPropDefs } from '@radix-ui/themes/props'

type SheetRootProps = Dialog.RootProps
const SheetRoot: FC<SheetRootProps> = props => <Dialog.Root {...props} />
SheetRoot.displayName = 'Sheet.Root'

type SheetTriggerProps = Dialog.TriggerProps
const SheetTrigger: FC<SheetTriggerProps> = props => <Dialog.Trigger {...props} />
SheetTrigger.displayName = 'Sheet.Trigger'

type SheetCloseProps = Dialog.CloseProps
const SheetClose: FC<SheetCloseProps> = props => <Dialog.Close {...props} />
SheetClose.displayName = 'Sheet.Close'

type SheetTitleProps = Dialog.TitleProps
const SheetTitle: FC<SheetTitleProps> = props => <Dialog.Title {...props} />
SheetClose.displayName = 'Sheet.Close'

type SheetDescriptionProps = Dialog.DescriptionProps
const SheetDescription: FC<SheetDescriptionProps> = props => <Dialog.Description {...props} />
SheetClose.displayName = 'Sheet.Close'

type SheetContentElement = ComponentRef<typeof SheetPrimitive.Content>
interface SheetContentProps
  extends ComponentPropsWithout<typeof SheetPrimitive.Content, RemovedProps>,
  DialogContentOwnProps {
  container?: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>['container']
}
const SheetContent = ({ align, ref: forwardedRef, ...props }: SheetContentProps & { ref?: React.RefObject<SheetContentElement> }) => {
  const { align: alignPropDef, ...propDefs } = dialogContentPropDefs
  const { className: alignClassName } = extractProps({ align }, { align: alignPropDef })
  const { className, container, forceMount, ...contentProps } = extractProps(props, propDefs)
  return (
    <SheetPrimitive.Portal container={container} forceMount={forceMount}>
      <Theme asChild>
        <SheetPrimitive.Overlay className="rt-BaseDialogOverlay rt-DialogOverlay">
          <div className="rt-BaseDialogScroll rt-DialogScroll">
            <div
              className={`rt-BaseDialogScrollPadding rt-DialogScrollPadding ${alignClassName}`}
            >
              <SheetPrimitive.Content
                {...contentProps}
                className={`rt-BaseDialogContent rt-DialogContent ${className}`}
                ref={forwardedRef}
                style={{
                  borderRadius: 0,
                  bottom: 0,
                  height: '100%',
                  margin: 0,
                  maxWidth: '480px',
                  position: 'fixed',
                  right: 0,
                  top: 0,
                }}
              />
            </div>
          </div>
        </SheetPrimitive.Overlay>
      </Theme>
    </SheetPrimitive.Portal>
  )
}
SheetContent.displayName = 'Dialog.Content'

export {
  SheetClose as Close,
  SheetContent as Content,
  SheetDescription as Description,
  SheetRoot as Root,
  SheetTitle as Title,
  SheetTrigger as Trigger,
}
export type {
  SheetCloseProps as CloseProps,
  SheetContentProps as ContentProps,
  SheetDescriptionProps as DescriptionProps,
  SheetRootProps as RootProps,
  SheetTitleProps as TitleProps,
  SheetTriggerProps as TriggerProps,
}
