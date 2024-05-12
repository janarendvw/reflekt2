'use client'
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap"
type Props = {
  size?: number;
  smooth?: boolean;
  characters?: boolean
};

function MatrixBackgound({size = 12, characters = true, smooth = true}:Props) {
    let fontSize = size;
    let lineHeight = 2;
    let rows = useMemo(() => Math.floor((window.innerHeight / (fontSize + lineHeight))), [fontSize, lineHeight]);
    let [rowsElements, setRowsElements] = useState<JSX.Element[]>([]);
    const randomNumber = useRef(0);
    useLayoutEffect(() => {
        
      let elements: JSX.Element[] = [];
      let ids: number[] = [];
      Array.from({ length: rows }, (_, i) => {
        let id = setInterval(() => {
        randomNumber.current = Math.random();
          elements[i] = (
            <text
            ref={smooth ? el => {
                if (el) {
                    gsap.from(
                    el,
                    {
                        opacity: 0,
                    },

                    )
                    gsap.to(el, {
                        opacity: 1 * randomNumber.current - i / (rows + 30),
                        duration: 1,
                        ease: "power3.out",
                        });
                    gsap.to(el, {
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: 1,
                    })
                    
                }
                }
                : null
            }
              y={i * fontSize * lineHeight}
              style={{ fontSize: `${fontSize}px`, opacity: randomNumber.current - i / (rows + 30)}}
              className={`w-screen text-justify whitespace-pre fill-muted-foreground font-mono font-medium`}
              key={i}
            >
              {Array.from({ length: window.innerWidth / fontSize }, () => {
                let char =
                    Math.random() > 0.94 && Math.random() * rows - i > i - rows
                    ?
                      (characters ? String.fromCharCode(Math.floor(Math.random() * 43) + 48)
                    :  'REFLEKT')
                    : ' ';
                return char;
              }).join(" ")}
            </text>
          );
          setRowsElements([...elements]);
        }, Math.random()*1000 + 1000);
        ids.push(id as any);
      })
      return () => {
        ids.forEach(clearInterval);
      };
    }, []);
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        height={window.innerHeight}
        
      >
        {rowsElements}
      </svg>
  );
}

export default MatrixBackgound;