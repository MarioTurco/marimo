/* Copyright 2024 Marimo. All rights reserved. */

import type { TypedString } from "./typed";

export type FilePath = TypedString<"FilePath">;

export const Paths = {
  isAbsolute: (path: string): boolean => {
    return (
      path.startsWith("/") || path.startsWith("\\") || path.startsWith("C:\\")
    );
  },
  dirname: (path: string) => {
    return PathBuilder.guessDeliminator(path).dirname(path as FilePath);
  },
  basename: (path: string) => {
    return PathBuilder.guessDeliminator(path).basename(path as FilePath);
  },
  extension: (filename: string): string => {
    const parts = filename.split(".");
    if (parts.length === 1) {
      return "";
    }
    return parts.at(-1) ?? "";
  },
};

export class PathBuilder {
  constructor(public readonly deliminator: "/" | "\\") {}

  static guessDeliminator(path: string): PathBuilder {
    return path.includes("/") ? new PathBuilder("/") : new PathBuilder("\\");
  }

  join(...paths: string[]): FilePath {
    return paths.filter(Boolean).join(this.deliminator) as FilePath;
  }

  basename(path: FilePath): FilePath {
    const parts = path.split(this.deliminator);
    return (parts.pop() ?? "") as FilePath;
  }

  dirname(path: FilePath): FilePath {
    const parts = path.split(this.deliminator);
    parts.pop();
    return parts.join(this.deliminator) as FilePath;
  }
}
