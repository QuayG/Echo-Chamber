package de.echochamber.backend.service;

import de.echochamber.backend.model.PollEntity;
import de.echochamber.backend.repo.PollRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Getter
public class PollService {
    private final PollRepository pollRepository;

    @Autowired
    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public PollEntity create(PollEntity pollEntity) {

        return pollRepository.save(pollEntity);
    }


}
