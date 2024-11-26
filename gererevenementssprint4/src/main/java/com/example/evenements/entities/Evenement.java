package com.example.evenements.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Evenement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long idEvenement;
	private String nomEvenement;
	private String description;
	private double prixEvenement;
	private Date dateEvenement;
	
	
	//l evenement que cette particpant le participe
	@ManyToOne //optional
	private Theme theme;

	//Constructor
	public Evenement(String nomEvenement, String description, double prixEvenement, Date dateEvenement) {
		super();
		this.nomEvenement = nomEvenement;
		this.description = description;
		this.prixEvenement = prixEvenement;
		this.dateEvenement = dateEvenement;
		
	}


	
	
	

}
