import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { IconButton, Tooltip, Button, Alert, Collapse } from "@mui/material";
import ImageGalleryDialog from "./ImageGallery";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ValidationErrors {
  name?: string;
  avatar?: string;
}

interface Props {
  onUsernameEnter: (name: string, avatar: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 32;
// Disallow names that are only whitespace or contain special chars
const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-_.]+$/;

// ─── Validation ───────────────────────────────────────────────────────────────

function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Имя обязательно для заполнения";
  }
  if (trimmed.length < NAME_MIN_LENGTH) {
    return `Имя должно содержать минимум ${NAME_MIN_LENGTH} символа`;
  }
  if (trimmed.length > NAME_MAX_LENGTH) {
    return `Имя не должно превышать ${NAME_MAX_LENGTH} символов`;
  }
  if (!NAME_REGEX.test(trimmed)) {
    return "Имя содержит недопустимые символы";
  }
  return undefined;
}

function validateAvatar(img: string): string | undefined {
  if (!img) {
    return "Пожалуйста, выберите аватар";
  }
  return undefined;
}

function validateAll(name: string, img: string): ValidationErrors {
  return {
    name: validateName(name),
    avatar: validateAvatar(img),
  };
}

function hasErrors(errors: ValidationErrors): boolean {
  return Object.values(errors).some(Boolean);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const style: { [key: string]: React.CSSProperties } = {
  paper: {
    backgroundColor: "lightslategrey",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    gap: "16px",
  },
  input: {
    width: "100%",
    color: "white",
  },
  avatar: {
    height: 80,
    width: 80,
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  submitBtn: {
    marginTop: "8px",
    width: "100%",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Greeting: React.FC<Props> = ({ onUsernameEnter }) => {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [open, setOpen] = useState(false);

  // touched tracks whether the user has interacted with each field
  // so we don't show errors before the user has had a chance to fill them in
  const [touched, setTouched] = useState<{ name: boolean; avatar: boolean }>({
    name: false,
    avatar: false,
  });

  // submitAttempted shows ALL errors once the user clicks Submit
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = validateAll(name, img);

  // Show error for a field if: user touched it OR submit was attempted
  const showNameError = (touched.name || submitAttempted) && !!errors.name;
  const showAvatarError = (touched.avatar || submitAttempted) && !!errors.avatar;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (hasErrors(errors)) return;

    onUsernameEnter(name.trim(), img);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!touched.name) {
      setTouched((prev) => ({ ...prev, name: true }));
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
  };

  const handleImageSelect = (imgURL: string) => {
    if (!imgURL) return;
    setImage(imgURL);
    setTouched((prev) => ({ ...prev, avatar: true }));
    setOpen(false);
  };

  return (
    <>
      <Paper style={style.paper}>
        <form onSubmit={handleSubmit} style={style.form} noValidate>
          <Typography variant="h5" align="center">
            Введите имя перед входом в чат
          </Typography>

          {/* Avatar picker */}
          <div style={style.avatarWrapper}>
            <IconButton onClick={() => setOpen(true)} disableRipple>
              <Tooltip title="Выбрать аватар">
                <Avatar
                  src={img}
                  style={{
                    ...style.avatar,
                    border: showAvatarError
                      ? "2px solid #f44336"
                      : img
                      ? "2px solid #4caf50"
                      : "2px dashed rgba(255,255,255,0.5)",
                  }}
                />
              </Tooltip>
            </IconButton>

            {/* Avatar error message */}
            <Collapse in={showAvatarError}>
              <Typography
                variant="caption"
                style={{ color: "#f44336", textAlign: "center" }}
              >
                {errors.avatar}
              </Typography>
            </Collapse>

            {/* Avatar success hint */}
            {img && !showAvatarError && (
              <Typography variant="caption" style={{ color: "#a5d6a7" }}>
                Аватар выбран ✓
              </Typography>
            )}

            {!img && !showAvatarError && (
              <Typography
                variant="caption"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Нажмите для выбора аватара
              </Typography>
            )}
          </div>

          {/* Name field */}
          <TextField
            style={style.input}
            label="Имя пользователя"
            placeholder="Введите имя..."
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={showNameError}
            helperText={showNameError ? errors.name : `${name.trim().length}/${NAME_MAX_LENGTH}`}
            inputProps={{ maxLength: NAME_MAX_LENGTH + 5 }} // allow typing slightly over to show error
            InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
            InputProps={{ style: { color: "white" } }}
            FormHelperTextProps={{
              style: {
                color: showNameError ? "#f44336" : "rgba(255,255,255,0.5)",
              },
            }}
          />

          {/* Global error summary — shown only after submit attempt */}
          <Collapse in={submitAttempted && hasErrors(errors)}>
            <Alert severity="error" style={{ width: "100%" }}>
              Пожалуйста, исправьте ошибки перед входом в чат
            </Alert>
          </Collapse>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={style.submitBtn}
          >
            Войти в чат
          </Button>
        </form>
      </Paper>

      <ImageGalleryDialog isOpen={open} onImageSelect={handleImageSelect} />
    </>
  );
};

export default Greeting;