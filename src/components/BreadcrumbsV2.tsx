import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ChevronRight } from "@mui/icons-material";

interface BreadcrumbsV2Props {
  links: { label: string; href?: string; icon?: JSX.Element | null }[];
  separator?: JSX.Element;
}

const BreadcrumbsV2: React.FC<BreadcrumbsV2Props> = ({ links, separator = <ChevronRight fontSize="small" /> }) => {
  return (
    <Breadcrumbs
      separator={separator}
      aria-label="breadcrumb"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Static Home Link with Icon */}
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          lineHeight: 1,
        }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: "1rem" }} /> {/* Explicit fontSize */}
      </Link>

      {/* Dynamic Links */}
      {links.map((link, index) => {
        const isLast = index === links.length - 1; // Check if it's the last link
        return isLast ? (
          <Typography
            key={index}
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              lineHeight: 1, // Ensure consistent vertical alignment
            }}
          >
            {link.icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 0.5,
                }}
              >
                {React.cloneElement(link.icon, { fontSize: "1rem" })} {/* Explicit fontSize */}
              </Box>
            )}
            {link.label}
          </Typography>
        ) : (
          <Link
            key={index}
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
            }}
            color="inherit"
            href={link.href}
          >
            {link.icon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 0.5,
                }}
              >
                {React.cloneElement(link.icon, { fontSize: "1rem" })} {/* Explicit fontSize */}
              </Box>
            )}
            {link.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsV2;