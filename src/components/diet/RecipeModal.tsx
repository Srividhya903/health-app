"use client";

import React, { useState } from "react";
import { Meal } from "@/data/dietData";
import { X, Clock, Check, Copy, Printer } from "lucide-react";

interface RecipeModalProps {
  meal: Meal | null;
  onClose: () => void;
}

export default function RecipeModal({ meal, onClose }: RecipeModalProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!meal) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyIngredients = () => {
    navigator.clipboard.writeText(meal.ingredients.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          background: "#080808",
          border: "1px solid #202020",
          padding: "2.5rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            color: "#707070",
            cursor: "pointer",
            padding: "0.25rem",
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <span className="label-upper">
              {meal.type} Protocol
            </span>
            <span style={{ color: "#303030" }}>—</span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#707070",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Clock size={12} /> {meal.prepTime}
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            {meal.title}
          </h2>

          <p style={{ fontSize: "0.9375rem", color: "#a0a0a0", lineHeight: 1.6 }}>
            {meal.description}
          </p>
        </div>

        {/* Nutritional Breakdown strip */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            borderBottom: "1px solid #1a1a1a",
            padding: "1.25rem 0",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Calories
            </span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
              {meal.calories}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Protein
            </span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
              {meal.protein}g
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Carbs
            </span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
              {meal.carbs}g
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#707070", display: "block", textTransform: "uppercase" }}>
              Fats
            </span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>
              {meal.fats}g
            </span>
          </div>
        </div>

        {/* Clinical Rationale */}
        <div style={{ marginBottom: "2rem" }}>
          <p className="label-upper" style={{ marginBottom: "0.5rem" }}>
            Biometric Impact & Mechanism
          </p>
          <p style={{ fontSize: "0.875rem", color: "#d0d0d0", lineHeight: 1.6 }}>
            {meal.clinicalBenefit}
          </p>
        </div>

        {/* Ingredients Checklist */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "1rem",
            }}
          >
            <p className="label-upper">
              Ingredients ({Object.values(checkedIngredients).filter(Boolean).length}/{meal.ingredients.length} checked)
            </p>
            <button
              onClick={copyIngredients}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                color: "#707070",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? "Copied" : "Copy List"}</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {meal.ingredients.map((ing, idx) => {
              const isChecked = checkedIngredients[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  style={{
                    borderTop: "1px solid #141414",
                    padding: "0.75rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: isChecked ? "#505050" : "#d0d0d0",
                    textDecoration: isChecked ? "line-through" : "none",
                    transition: "color 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: isChecked ? "1px solid #fff" : "1px solid #404040",
                      background: isChecked ? "#fff" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isChecked && <span style={{ width: "6px", height: "6px", background: "#000" }} />}
                  </span>
                  <span>{ing}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preparation Instructions */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p className="label-upper" style={{ marginBottom: "1rem" }}>
            Method
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {meal.instructions.map((step, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid #141414",
                  padding: "1rem 0",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: "#505050",
                    lineHeight: 1.5,
                  }}
                >
                  0{idx + 1}
                </span>
                <p style={{ fontSize: "0.875rem", color: "#a0a0a0", lineHeight: 1.6 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.8125rem",
              color: "#707070",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Printer size={14} /> Print Protocol
          </button>

          <button
            onClick={onClose}
            className="btn-mono-primary"
            style={{ fontSize: "0.8125rem", padding: "0.6rem 1.5rem" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
