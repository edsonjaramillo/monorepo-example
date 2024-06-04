'use client';

import React, { useRef, useState } from 'react';

import type { As } from '../atoms/Text';
import { Text } from '../atoms/Text';
import { cn } from '../lib/cn';

type AccordionProps = React.ComponentProps<'div'> & AccordionType;

type Core = { header: string; headerAs?: As };
type WithChildren = Core & { children: React.ReactNode };
type WithoutChildren = Core & { content: string };
type AccordionType = WithChildren | WithoutChildren;

/**
 * Accordion component.
 *
 * This component displays a header that can be clicked to show or hide content.
 * The content can be passed as a string or as child components.
 *
 * @param {string} header - The text to display in the accordion header.
 * @param {As} [headerAs='p'] - The HTML element to use for the header text.
 * @param {string} content - The text to display in the accordion body when no children are provided.
 *
 * @example
 * // Example usage without children
 * <Accordion header="Accordion Header" content="Accordion content goes here." />
 *
 * @example
 * // Example usage with children
 * <Accordion header="Accordion Header">
 *   <p>Child content goes here.</p>
 * </Accordion>
 */
export function Accordion({
  header,
  headerAs = 'p',
  content,
  children,
  className,
  ...props
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHeight = (contentRef.current?.scrollHeight || 0) + 16;

  return (
    <div className={cn('overflow-hidden border-b border-grayscale-300', className)} {...props}>
      <button
        aria-expanded={isOpen}
        className="group/accordion flex w-full items-center justify-between py-4"
        onClick={() => setIsOpen(!isOpen)}>
        <Text
          as={headerAs}
          className="font-medium underline-offset-4 transition-all duration-base group-hover/accordion:underline">
          {header}
        </Text>
        <Icon isOpen={isOpen} />
      </button>
      <div
        className={cn('transition-all duration-base', isOpen && 'pb-4')}
        ref={contentRef}
        style={{ height: isOpen ? scrollHeight : 0 }}>
        {!children && (
          <Text as="p" size="small" className="text-pretty">
            {content}
          </Text>
        )}
        {children}
      </div>
    </div>
  );
}

type IconProps = React.ComponentProps<'svg'> & { isOpen: boolean };
function Icon({ className, isOpen, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      className={cn(
        'size-4 text-grayscale-standard transition-transform duration-base',
        isOpen && 'rotate-180',
        className,
      )}
      {...props}>
      <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
