
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Database,
} from "lucide-react";

const firebaseData = {
  users: {
    userId: {
      profile: {
        displayName: "Lectrice",
        email: "lectrice@example.com",
        photoURL: "https://example.com/avatar.jpg",
        createdAt: 1790015927932,
      },
      preferences: {
        annualGoal: 6,
        favoriteGenres: [
          "thriller",
          "philosophy",
          "mystery",
        ],
        language: "fr",
        onboardingCompleted: true,
        updatedAt: 1791515792289,
      },
      library: {
        bookId: {
          addedAt: 1790253892084,
          authors: ["Jacqueline Harpman"],
          categories: [
            "Fiction / Literary",
            "Fiction / General",
          ],
          cover: "https://books.google.com/...",
          googleBooksId: "exampleBookId",
          isbn: "2234099617",
          publishedDate: "2025-04-30",
          status: "reading",
          title:
            "Moi qui n'ai pas connu les hommes",
          updatedAt: 1791413584142,
        },
      },
      collections: {
        collectionId: {
          books: {
            bookId: true,
          },
          createdAt: 1790254242285,
          description: "Une collection personnelle",
          icon: "book-heart",
          name: "Mes préférés",
          order: 1,
          pinned: true,
          updatedAt: 1790756897280,
        },
      },
    },
  },
};

function FirebaseNode({
  name,
  value,
  depth = 0,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isExpandable =
    value !== null && typeof value === "object";

  const isArray = Array.isArray(value);

  const entries = isExpandable
    ? Object.entries(value)
    : [];

  const displayValue = () => {
    if (typeof value === "string") {
      return (
        <span className="break-all text-lime">
          "{value}"
        </span>
      );
    }

    if (typeof value === "boolean") {
      return (
        <span className="text-[#D9B8FF]">
          {String(value)}
        </span>
      );
    }

    if (typeof value === "number") {
      return (
        <span className="text-[#E9C48A]">
          {value}
        </span>
      );
    }

    return (
      <span className="text-parchment/60">
        null
      </span>
    );
  };

  return (
    <div>
      {isExpandable ? (
        <button
          type="button"
          onClick={() =>
            setIsOpen((previous) => !previous)
          }
          aria-expanded={isOpen}
          className="flex min-h-8 w-[calc(100%-var(--indent))] items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-parchment/10"
          style={{
            "--indent": `${depth * 18}px`,
            marginLeft: depth * 18,
          }}
        >
          {isOpen ? (
            <ChevronDown
              size={15}
              className="shrink-0 text-parchment/70"
            />
          ) : (
            <ChevronRight
              size={15}
              className="shrink-0 text-parchment/70"
            />
          )}

          <span className="break-all font-mono text-xs font-semibold text-mintcream sm:text-sm">
            {name}
          </span>

          {!isOpen && (
            <span className="text-[11px] text-parchment/40">
              {isArray
                ? `[${entries.length}]`
                : `{${entries.length}}`}
            </span>
          )}
        </button>
      ) : (
        <div
          className="flex min-h-8 items-center gap-2 px-2 py-1"
          style={{ marginLeft: depth * 18 }}
        >
          <span className="w-[15px] shrink-0" />

          <span className="font-mono text-xs text-parchment/80 sm:text-sm">
            {name}:
          </span>

          <span className="font-mono text-xs sm:text-sm">
            {displayValue()}
          </span>
        </div>
      )}

      {isExpandable && isOpen && (
        <div className="relative">
          <div
            className="absolute bottom-2 top-0 w-px bg-parchment/15"
            style={{
              left: depth * 18 + 16,
            }}
          />

          {entries.map(([key, childValue]) => (
            <FirebaseNode
              key={key}
              name={key}
              value={childValue}
              depth={depth + 1}
            />
          ))}

          {entries.length === 0 && (
            <p
              className="py-1 font-mono text-xs text-parchment/40"
              style={{
                marginLeft: (depth + 1) * 18 + 24,
              }}
            >
              {isArray ? "[]" : "{}"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function FirebaseTree() {
  return (
    <div className="flex w-full max-w-5xl flex-col rounded-2xl border border-parchment/20 bg-darkwood/70 p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-3 border-b border-parchment/15 pb-3">
        <Database
          size={19}
          className="shrink-0 text-lime"
          strokeWidth={1.8}
        />

        <span className="text-sm font-bold text-mintcream sm:text-base">
          Firebase Realtime Database
        </span>
      </div>

      <div className="min-h-0 overflow-visible">
        <FirebaseNode
          name="users"
          value={firebaseData.users}
          defaultOpen
        />
      </div>

      <p className="mt-3 border-t border-parchment/15 pt-3 text-xs text-parchment/50">
        Structure simplifiée — données fictives
      </p>
    </div>
  );
}

function VisualSlide({ slide }) {
  const isDataModel = slide.id === "data-model";

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime sm:text-xs">
          {slide.section}
        </p>

        <h2 className="font-heading text-4xl font-medium leading-tight text-mintcream sm:text-5xl">
          {slide.title}
        </h2>

        <p className="text-sm text-parchment/70 sm:text-base">
          {slide.subtitle}
        </p>
      </div>

      <div
        className={`flex items-center justify-center rounded-3xl border border-parchment/20 bg-walnut/55 p-3 sm:p-5 ${
          isDataModel
            ? "min-h-[360px]"
            : "min-h-64 sm:min-h-80"
        }`}
      >
        {isDataModel ? (
          <FirebaseTree />
        ) : slide.image ? (
          <div className="flex w-full items-center justify-center rounded-2xl bg-parchment p-3 sm:p-5">
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-[60vh] max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="space-y-4 py-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-2xl text-lime"
            >
              ♡
            </div>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-parchment sm:text-lg">
              {slide.description}
            </p>

            <p className="text-xs uppercase tracking-widest text-parchment/45">
              Visuel à ajouter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VisualSlide;
