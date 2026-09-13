"""GAIMER Editor smoke check. Run INSIDE the O3DE Editor via --runpython (launch_editor.ps1 -Smoke).

Proves, and writes to <project>/user/gaimer_editor_smoke.json:
  - EditorPythonBindings works (azlmbr importable)
  - QtForPython works (PySide2 importable)
  - the GaimerAiOrchestration gem's Python is on sys.path (its dialog module imports)
  - its view pane registered at bootstrap and opens as a QDockWidget

Notes: gem-bootstrap print() never reaches Editor.log; this script's prints appear as '(python_test)'.
"""
import json, os, sys, tempfile, traceback

PANE = "GaimerAiOrchestration"
r = {"azlmbr": False, "pyside2": False, "gem_dialog_import": False, "open_pane_via": None,
     "is_pane_visible": None, "dock_found": False, "dock_titles": [], "errors": []}

def rec(k, e):
    r["errors"].append(k + ": " + "".join(traceback.format_exception_only(type(e), e)).strip())

out_dir = tempfile.gettempdir()
try:
    import azlmbr, azlmbr.bus as bus, azlmbr.editor as editor, azlmbr.legacy.general as general
    r["azlmbr"] = True
except Exception as e:
    rec("azlmbr", e)
try:
    import azlmbr.paths
    out_dir = os.path.join(azlmbr.paths.projectroot, "user")
except Exception:
    pass  # fall back to the temp dir; not a failure
try:
    from PySide2 import QtWidgets
    r["pyside2"] = True
except Exception as e:
    rec("pyside2", e)
try:
    import gaimeraiorchestration_dialog  # noqa: F401  (gem Editor/Scripts must be on sys.path)
    r["gem_dialog_import"] = True
except Exception as e:
    rec("gem_dialog_import", e)
if r["azlmbr"]:
    try:
        general.open_pane(PANE); r["open_pane_via"] = "legacy.general.open_pane"
    except Exception as e:
        rec("open_pane", e)
        try:
            editor.EditorRequestBus(bus.Broadcast, "OpenViewPane", PANE); r["open_pane_via"] = "EditorRequestBus.OpenViewPane"
        except Exception as e2:
            rec("OpenViewPane", e2)
    try:
        r["is_pane_visible"] = bool(general.is_pane_visible(PANE))
    except Exception as e:
        rec("is_pane_visible", e)
if r["pyside2"]:
    try:
        app = QtWidgets.QApplication.instance()
        titles = sorted({w.windowTitle() for w in app.allWidgets()
                         if isinstance(w, QtWidgets.QDockWidget) and w.windowTitle()})
        r["dock_titles"] = titles
        r["dock_found"] = any(PANE in t for t in titles)
    except Exception as e:
        rec("dock_scan", e)

os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "gaimer_editor_smoke.json")
with open(out, "w") as fh:
    json.dump(r, fh, indent=2)
ok = r["azlmbr"] and r["pyside2"] and r["dock_found"] and not r["errors"]
print("GAIMER_SMOKE_DONE ok=%s file=%s" % (ok, out))
