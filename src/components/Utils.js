import React, { useState } from "react";
import { FaFolder, FaEthereum, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillCaretRight, AiFillEye } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { VscError } from "react-icons/vsc";
import { FiSlash } from "react-icons/fi";
import { RiSpeedFill, RiCloseFill } from "react-icons/ri"; // RiPlayFill
import {
  BiDetail,
  BiDotsHorizontalRounded,
  BiInfoCircle,
} from "react-icons/bi";
import { usePostStore, useUserStore } from "../components";
import {
  FolderWrapper,
  ConsoleWrapper,
  PeekWrapper,
  CSWrapper,
  DisplayWrapper,
  Tag,
  ExtraTags,
} from "../elements";

/* -------------------------------------------------------------------------- */
/*                  CONTENT SWITCHER (CS) & DISPLAY (Display)                 */
/* -------------------------------------------------------------------------- */

export const CS = ({ children }) => {
  const [isKey, setKey] = useState(false);
  const header = children[0];
  const display = children[1];
  const overview = children[2];
  const key = children[3];
  const link = header.props.children.props.children;
  return (
    <CSWrapper content={isKey ? "fast" : "detailed"} link={link.toLowerCase()}>
      <div>
        {header}

        <span onClick={() => setKey(!isKey)}>
          {isKey ? "Key Features" : "Overview"}
        </span>
      </div>
      {display}
      {isKey ? overview : key}
    </CSWrapper>
  );
};

export const Display = ({ iconOf }) => {
  const icon = () => {
    switch (iconOf) {
      case "react":
        return <FaReact />;
      default:
        return <FaReact />;
    }
  };
  return <DisplayWrapper i={iconOf}>{icon()}</DisplayWrapper>;
};

/* -------------------------------------------------------------------------- */
/*                               TAGS (GetTags)                               */
/* -------------------------------------------------------------------------- */

export const GetTags = (tags) => {
  const [showExtras, setShowExtras] = useState(false);
  const getIcon = (tag) => {
    switch (tag) {
      case "react":
        return <FaReact />;
      case "fast":
        return <RiSpeedFill />;
      case "detailed":
        return <BiDetail />;
      case "informative":
        return <BiInfoCircle />;
      default:
        return <FiSlash />;
    }
  };

  return (
    <div>
      {tags.map((tag, index) => {
        const icon = getIcon(tag);
        return (
          <React.Fragment key={tag}>
            <Tag
              key={tag}
              tag={tag}
              style={index >= 3 && !showExtras ? { display: "none" } : null}
            >
              {icon}
              {tag}
            </Tag>
            {index >= 3 && index === tags.length - 1 ? (
              <ExtraTags key={tag} onClick={() => setShowExtras(!showExtras)}>
                {!showExtras ? (
                  <BiDotsHorizontalRounded key={tag} />
                ) : (
                  <RiCloseFill key={tag} />
                )}
              </ExtraTags>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 FOLDER (F)                                 */
/* -------------------------------------------------------------------------- */

export const F = ({ children, folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { repo } = usePostStore();
  const { path } = folder;
  const getExtensionIcon = (extension) => {
    if (extension === "js") {
      return <IoLogoJavascript />;
    }
    if (extension === "sol") {
      return <FaEthereum />;
    }
  };
  return (
    <FolderWrapper onClick={() => setIsOpen(!isOpen)}>
      <div
        style={
          isOpen
            ? { maxHeight: "500px", transition: " max-height 0.5s ease-in" }
            : null
        }
      >
        {folder.name.map((file, index) => {
          const extension = file.split(".")[1];
          const icon = getExtensionIcon(extension);
          return (
            <a
              key={index}
              href={`https://github.com/Paul-Bokelman/${repo}/blob/main/${path}/${file}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {icon}
              {file}
              <BsArrowRightShort key={index} className="external" />
            </a>
          );
        })}
      </div>
      <code>
        <FaFolder />
        {children}
      </code>
    </FolderWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Console (C)                                */
/* -------------------------------------------------------------------------- */

export const C = ({ children, file, type }) => {
  const dark = useUserStore((state) => state.dark);
  console.log(type);
  console.log(dark);

  return (
    <ConsoleWrapper
      className="console"
      type={type === undefined ? "regular" : type === "warn" ? "warn" : "err"}
    >
      {type === "warn" ? (
        <TiWarning />
      ) : type === "err" ? (
        <VscError fillRule="nonzero" />
      ) : null}
      <span id="content" style={{ fontStyle: "italic" }}>
        <AiFillCaretRight />
        {children}
      </span>
      <span id="file">{file}</span>
    </ConsoleWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Peek                                    */
/* -------------------------------------------------------------------------- */

export const Peek = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  console.log(children);
  return (
    <PeekWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? <AiFillEye /> : children}
    </PeekWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Bool                                    */
/* -------------------------------------------------------------------------- */

export const Bool = ({ children }) => {
  return <span style={{ color: "orange" }}>{children}</span>;
};