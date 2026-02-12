package dev.salyem.cv.controller;

import dev.salyem.cv.dto.CvDto;
import dev.salyem.cv.service.CvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "https://salyem.dev"})
public class CvController {

    private final CvService cvService;

    @GetMapping
    public ResponseEntity<CvDto> getFullCv() {
        return ResponseEntity.ok(cvService.getFullCv());
    }
}
