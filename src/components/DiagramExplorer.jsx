
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";

const userFlowImages = import.meta.glob(
  "../assets/screenshots/userflow/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const machineFlowImages = import.meta.glob(
  "../assets/screenshots/machineflow/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const diagramNames = {
  userflow3: "Parcours utilisateur global",
  machinefllowauth: "Authentification",
  machineflowauth: "Authentification",
  machineflowaddabook: "Ajout d'un livre",
  machineflowbookpage: "Fiche livre",
  machineflowcollection: "Collections",
  machineflowdiscover: "Recherche et découverte",
  machineflowlibrary: "Bibliothèque",
  machineflowreview: "Avis et notes",
  machineflowsettings: "Paramètres",
  machineflowstatus: "Statuts de lecture",
};

function formatName(path) {
  const filename = path.split("/").pop();
  const rawName = filename.replace(/\.[^.]+$/, "");

  const normalizedName = rawName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (diagramNames[normalizedName]) {
    return diagramNames[normalizedName];
  }

  if (normalizedName.includes("add") &&
      normalizedName.includes("book")) {
    return "Ajout d'un livre";
  }

  if (normalizedName.includes("discover")) {
    return "Recherche et découverte";
  }

  if (normalizedName.includes("userflow")) {
    return "Parcours utilisateur global";
  }

  return rawName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createImageList(images) {
  return Object.entries(images)
    .map(([path, src]) => ({
      id: path,
      name: formatName(path),
      src,
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, "fr", {
        numeric: true,
      }),
    );
}

const folders = [
  {
    id: "userflow",
    name: "User flows",
    description: "Parcours et interactions utilisateur",
    images: createImageList(userFlowImages),
  },
  {
    id: "machineflow",
    name: "Machine flows",
    description: "Logique et traitements techniques",
    images: createImageList(machineFlowImages),
  },
];

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.25;

function DiagramViewer({ image, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const dragging = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const changeZoom = (amount) => {
    setZoom((previous) =>
      Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, previous + amount),
      ),
    );
  };

  const handleWheel = (event) => {
    event.preventDefault();

    changeZoom(
      event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP,
    );
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;

    dragging.current = {
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  const handlePointerMove = (event) => {
    if (!dragging.current) return;

    setPosition({
      x:
        dragging.current.startX +
        event.clientX -
        dragging.current.x,
      y:
        dragging.current.startY +
        event.clientY -
        dragging.current.y,
    });
  };

  const handlePointerUp = () => {
    dragging.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Diagramme : ${image.name}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#171311]/98 text-parchment"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-parchment/15 bg-darkwood px-4 py-3 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <ImageIcon
            size={18}
            className="shrink-0 text-lime"
          />

          <p className="truncate text-xs font-bold sm:text-sm">
            {image.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeZoom(-ZOOM_STEP)}
            aria-label="Dézoomer"
            className="rounded-lg border border-parchment/20 p-2 hover:bg-parchment/10"
          >
            <Minus size={17} />
          </button>

          <span className="min-w-14 text-center font-mono text-xs">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => changeZoom(ZOOM_STEP)}
            aria-label="Zoomer"
            className="rounded-lg border border-parchment/20 p-2 hover:bg-parchment/10"
          >
            <Plus size={17} />
          </button>

          <button
            type="button"
            onClick={resetView}
            aria-label="Réinitialiser le zoom"
            title="Réinitialiser"
            className="rounded-lg border border-parchment/20 p-2 hover:bg-parchment/10"
          >
            <RotateCcw size={17} />
          </button>

          <div className="mx-1 h-6 w-px bg-parchment/20" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le diagramme"
            className="rounded-lg border border-parchment/20 p-2 hover:bg-parchment/10"
          >
            <X size={19} />
          </button>
        </div>
      </div>

      <div
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative min-h-0 flex-1 cursor-grab overflow-hidden bg-[#211D1B] active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={image.src}
            alt={image.name}
            draggable={false}
            className="max-h-[88%] max-w-[94%] select-none object-contain"
          />
        </div>
      </div>

      <p className="shrink-0 border-t border-parchment/15 bg-darkwood px-4 py-3 text-center text-[11px] text-parchment/55 sm:text-xs">
        Molette pour zoomer · Glisser pour déplacer ·
        Échap pour fermer
      </p>
    </div>
  );
}

function DiagramFolder({ folder, onOpenImage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-parchment/20 bg-darkwood/60">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-parchment/5 sm:p-5"
      >
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime/10 text-lime">
          {isOpen ? (
            <FolderOpen size={22} strokeWidth={1.6} />
          ) : (
            <Folder size={22} strokeWidth={1.6} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-bold text-mintcream">
            {folder.name}
          </p>

          <p className="mt-1 text-xs text-parchment/55">
            {folder.description}
          </p>
        </div>

        <span className="rounded-full bg-parchment/10 px-3 py-1 text-xs text-parchment/70">
          {folder.images.length}
        </span>

        {isOpen ? (
          <ChevronDown size={18} className="text-parchment/60" />
        ) : (
          <ChevronRight size={18} className="text-parchment/60" />
        )}
      </button>

      {isOpen && (
        <div className="grid gap-2 border-t border-parchment/15 p-3 sm:p-4">
          {folder.images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => onOpenImage(image)}
              className="group flex min-h-12 items-center gap-3 rounded-xl border border-parchment/10 bg-walnut/45 px-4 py-3 text-left transition-colors hover:border-lime/50 hover:bg-walnut"
            >
              <ImageIcon
                size={18}
                className="shrink-0 text-lime/70"
              />

              <span className="min-w-0 flex-1 text-sm text-parchment">
                {image.name}
              </span>

              <Maximize2
                size={16}
                className="shrink-0 text-parchment/40 transition-colors group-hover:text-lime"
              />
            </button>
          ))}

          {folder.images.length === 0 && (
            <p className="py-5 text-center text-xs text-parchment/50">
              Aucun diagramme trouvé dans ce dossier.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function DiagramExplorer() {
  const [selectedImage, setSelectedImage] =
    useState(null);

  return (
    <>
      <div className="w-full max-w-6xl space-y-4">
        <div className="grid items-start gap-4 sm:grid-cols-2">
          {folders.map((folder) => (
            <DiagramFolder
              key={folder.id}
              folder={folder}
              onOpenImage={setSelectedImage}
            />
          ))}
        </div>

        <p className="text-center text-xs text-parchment/50">
          Sélectionner un dossier, puis un diagramme
          pour l'agrandir.
        </p>
      </div>

      {selectedImage && (
        <DiagramViewer
          key={selectedImage.id}
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

export default DiagramExplorer;
